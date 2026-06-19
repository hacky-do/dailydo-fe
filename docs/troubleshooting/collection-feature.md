# 컬렉션 기능 구현 트러블슈팅

## 개요

- 발생일: 2026-06-18 ~ 2026-06-19
- 환경: Next.js 16, TypeScript, TanStack Query, MSW
- 브랜치: `feature/collection-list`
- 상태: 일부 해결 / POST body 수정 중

## 문제 요약

컬렉션 페이지(`/collections`) 구현 과정에서 타입 불일치, 무한 로딩, API body 오류 등 다수의 문제가 발생했다.

---

## 해결 과정

### 1. 사용자 요청

> API 응답 JSON 구조와 Collections type이 동일한가

```json
{
  "collections": [
    {
      "collectionId": "1",
      "image": "string",
      "title": "string",
      "completed": true,
      "description": "string",
      "acquisitionRate": 2.6,
      "requirements": [
        { "missionId": 0, "title": "string", "count": 0 }
      ]
    }
  ]
}
```

### 1. 분석 및 대응

- **원인 분석**: 모든 필드가 일치하나 `requirements` 타입이 `[{...}]` 튜플로 선언되어 있어 요소가 1개로 고정됨
- **시도**: `requirements` 타입을 `[{...}]` → `{...}[]` (배열)로 변경
- **결과**: 정상 수정
- **판단**: API는 requirements가 여러 개일 수 있으므로 배열이 맞음

**변경 파일**: `src/entities/collection/model/collection.types.ts`

```ts
// 변경 전 (튜플 - 1개 고정)
requirements: [{ missionId: number; title: string; count: number }];

// 변경 후 (배열 - 여러 개 허용)
requirements: { missionId: number; title: string; count: number }[];
```

---

### 2. 사용자 요청

> collection-grid.tsx를 collection.types type에 맞게 수정해줘

### 2. 분석 및 대응

- **원인 분석**: `CollectionGrid`에서 3가지 문제 발견
  1. `Collections`는 `{ collections: [...] }` 객체인데 바로 `.map()` 호출
  2. `collection.id` 사용 → 실제 필드명은 `collectionId`
  3. `{...collection}` 스프레드 → `CollectionBox`가 기대하는 `{ id, src, title }` 필드명과 API 응답 `{ collectionId, image }` 불일치
  4. `collections?: Collections` optional 처리 없음 (`useQuery`의 `data`는 `undefined` 가능)
- **시도**: 위 4가지 수정
- **결과**: 정상 수정

**변경 파일**: `src/widgets/collections/ui/collection-grid.tsx`

```tsx
// 변경 전
{collections.map((collection) => (
  <CollectionBox key={collection.id} {...collection} />
))}

// 변경 후
{collections?.collections.map((collection) => (
  <CollectionBox
    key={collection.collectionId}
    id={collection.collectionId}
    src={collection.image}
    title={collection.title}
  />
))}
```

---

### 3. 사용자 요청

> 왜 에러가 나는가

### 3. 분석 및 대응

- **원인 분석**: TypeScript 에러 확인 결과 3가지 문제
  1. `Collection` 타입이 `collection.types.ts`에 없음 → `CollectionBox`, `collection.mock.ts`, `index.tsx` 모두 import 실패
  2. `RepresentativeCollection`이 `userCollections` prop을 필수로 받는데 전달 안 됨
- **시도**: `Collection` 인터페이스 추가

**변경 파일**: `src/entities/collection/model/collection.types.ts`

```ts
export interface Collection {
  id: number | string;
  src: string;
  title: string;
  description: string;
  requirements: { missionId: number; title: string; count: number }[];
}
```

---

### 4. 사용자 요청

> RepresentativeCollection 에러도 수정해줘

### 4. 분석 및 대응

- **원인 분석**: `collection-page.tsx`에서 이전 방식(`imageSrc`, `title` 개별 prop)으로 호출 중. `RepresentativeCollection`은 `userCollections: UserCollection` 객체 전체를 받도록 변경된 상태
- **시도**: `useGetUserCollection()` 호출 추가, 데이터 undefined 시 렌더링 방어 처리
- **결과**: 정상 수정

**변경 파일**: `src/views/mycollections/ui/collection-page.tsx`

```tsx
const { data: userCollections } = useGetUserCollection();

{userCollections && (
  <RepresentativeCollection userCollections={userCollections} />
)}
```

---

### 5. 사용자 요청

> userCollections 값이 비어있으면 기본 이미지와 타이틀 내가 보내줘야하는데 구조를 어떻게 수정하면 되는가

### 5. 설계 결정 및 구현

- **설계 방향**: `RepresentativeCollection`에서 `userCollections`를 optional로 받고, 없을 때 사용할 `defaultImage`, `defaultTitle`을 별도 prop으로 추가
- **이유**: 컴포넌트 외부(page)에서 기본값을 제어할 수 있어 유연함

**변경 파일**: `src/features/representative-collection/ui/representative-collection.tsx`

```tsx
interface RepresentativeCollectionProps {
  userCollections?: UserCollection;
  defaultImage: string;
  defaultTitle: string;
}

// 사용
const image = userCollections?.image ?? defaultImage;
const title = userCollections?.title ?? defaultTitle;
```

**변경 파일**: `src/views/mycollections/ui/collection-page.tsx`

```tsx
<RepresentativeCollection
  userCollections={userCollections}
  defaultImage="/mocks/images/test_image.png"
  defaultTitle="대표 컬렉션이 설정되지 않았어요"
/>
```

---

### 6. 사용자 요청

> CollectionTabs에서 selectedId에 따라 다르게 보일려고 한다. 1일때는 collections 전체 2일때는 collections.Completed가 true인 것만 3일때는 false인 것만 보여줄려고 한다

### 6. 설계 결정 및 구현

- **설계 방향**:
  1. `CollectionItem` 타입을 `collection.types.ts`에 별도 추출 (재사용성)
  2. 필터링 로직은 `collection-page.tsx`에서 처리 (관심사 분리)
  3. `CollectionGrid`는 필터링된 배열만 받음 (`items?: CollectionItem[]`)

**변경 파일**: `src/entities/collection/model/collection.types.ts`

```ts
export interface CollectionItem {
  collectionId: string;
  image: string;
  title: string;
  completed: boolean;
  description: string;
  acquisitionRate: number;
  requirements: { missionId: number; title: string; count: number }[];
}

export interface Collections {
  collections: CollectionItem[];
}
```

**변경 파일**: `src/views/mycollections/ui/collection-page.tsx`

```tsx
const allItems = collectionsData?.collections ?? [];
const filteredItems =
  collectionsTab === 2
    ? allItems.filter((c) => c.completed)
    : collectionsTab === 3
      ? allItems.filter((c) => !c.completed)
      : allItems;
```

| selectedId | 표시 내용 |
|---|---|
| 1 | 전체 |
| 2 | `completed === true` 만 |
| 3 | `completed === false` 만 |

---

### 7. 사용자 요청

> 테스트 이미지 가져와서 image 컴포넌트에 넣

### 7. 분석 및 대응

- **설계 방향**: `src` prop이 없거나 이미지 로드 실패 시 테스트 이미지(`/mocks/images/test_image.png`)로 폴백
- **구현**: `imgSrc` state + `onError` 핸들러

**변경 파일**: `src/entities/collection/ui/collection-box.tsx`

```tsx
const FALLBACK_IMAGE = '/mocks/images/test_image.png';

const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

<Image
  src={imgSrc}
  alt=""
  width={80}
  height={80}
  onError={() => setImgSrc(FALLBACK_IMAGE)}
/>
```

---

### 8. 사용자 요청

> handlePostCollection 함수 완성해줘

### 8. 분석 및 대응

- **원인 분석**: 두 가지 버그 발견
  1. `postUserCollection({ collectionId: id })` → mutation이 `string`을 기대하는데 객체 전달
  2. `handlePostCollection`이 버튼에 연결 안 됨 (선언만 되고 미사용)
- **시도**: body를 `String(id)`로 수정, 버튼에 `onClick={handlePostCollection}` 연결
- **결과**: 정상 수정

---

### 9. 사용자 요청 (핵심 버그)

> 컬렉션 페이지 이동 무한 로딩 밠ㅇ

### 9. 분석 및 대응

- **원인 분석**: `CollectionBox` 컴포넌트 내부에서 `useGetUserCollection()`을 호출 중
  - 컬렉션 아이템이 N개면 N개의 API 요청이 동시 발생
  - `staleTime: 0`으로 매 렌더링마다 refetch
  - mutation 성공 시 `invalidateQueries` → 전체 N개 쿼리가 동시 refetch → 렌더링 → 다시 refetch 반복

**구조 개선 방향**: 데이터를 최상위에서 한 번만 fetch하고 prop으로 내려주기

**변경 파일**: `src/entities/collection/ui/collection-box.tsx`
- `useGetUserCollection()` 제거
- `isRepresentative?: boolean` prop 추가

**변경 파일**: `src/widgets/collections/ui/collection-grid.tsx`
- `userCollectionId?: string` prop 추가
- `isRepresentative={userCollectionId === collection.collectionId}` 계산하여 전달

**변경 파일**: `src/views/mycollections/ui/collection-page.tsx`
- `userCollectionId={userCollections?.id}` 전달

```
collection-page.tsx
  └── userCollections?.id
        └── CollectionGrid (userCollectionId)
              └── CollectionBox × N (isRepresentative)
```

**추가 수정**: 버튼 조건 로직이 반대로 되어 있던 것도 함께 수정

```tsx
// 변경 전 (반대로 되어 있음)
{filterData ? (
  <Button onClick={handlePostCollection}>대표 컬렉션으로 설정</Button>  // filterData=true면 설정??
) : (
  <Button onClick={handleDeleteCollection}>대표 컬렉션에서 해제</Button>
)}

// 변경 후 (올바른 로직)
{isRepresentative ? (
  <Button onClick={handleDeleteCollection}>대표 컬렉션에서 해제</Button>
) : (
  <Button onClick={handlePostCollection}>대표 컬렉션으로 설정</Button>
)}
```

---

### 10. 사용자 요청

> 이제 실제로 확인해봐 → "id must be a string, description must be a string, title must be a string" 에러 발생

### 10. 분석 및 대응

- **원인 분석**:
  1. MSW가 `initMocks()`에서 `return;`으로 완전히 비활성화된 상태
  2. 모든 API 요청이 실제 백엔드(`http://localhost:4000`)로 전달됨
  3. `postUserCollection`이 `JSON.stringify({ collectionId })` 전송 중
  4. 백엔드 DTO는 `{ id, title, description, image }` 를 기대 → NestJS class-validator가 400 반환
  5. `parseResponse`에서 배열인 `data.message`가 문자열로 변환되면서 `"id must be a string, description must be a string, title must be a string"` 출력

- **확인 방법**:
  - `curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/users/collections` → 401 (백엔드 정상 동작, 인증 필요)
  - Next.js 로그 확인 → 페이지 렌더링은 정상, POST 요청에서 에러 발생

- **미해결 상태**: `collection.api.ts`의 `postUserCollection` body 수정 필요 (사용자가 직접 변경 중)

---

## 최종 아키텍처

```
collection-page.tsx
├── useGetCollection()          → GET /api/users/collections
├── useGetUserCollection()      → GET /api/users/me/collections/featured
│
├── RepresentativeCollection
│   ├── userCollections (optional)
│   ├── defaultImage
│   └── defaultTitle
│
├── CollectionTabs
│   └── selectedId (1=전체 / 2=completed / 3=미완료)
│
└── CollectionGrid
    ├── items (필터링된 CollectionItem[])
    └── userCollectionId
          └── CollectionBox × N
              ├── isRepresentative (prop으로 계산)
              ├── usePostUserCollection()
              └── useDeleteUserCollection()
```

## 참고 자료

- `src/entities/collection/model/collection.types.ts` — 타입 정의
- `src/entities/collection/api/collection.api.ts` — API 함수
- `src/entities/collection/api/collection.queries.ts` — TanStack Query hooks
- `src/entities/collection/ui/collection-box.tsx` — 컬렉션 아이템 컴포넌트
- `src/widgets/collections/ui/collection-grid.tsx` — 그리드 레이아웃
- `src/views/mycollections/ui/collection-page.tsx` — 페이지
- `src/features/representative-collection/ui/representative-collection.tsx` — 대표 컬렉션 컴포넌트
- `src/mocks/index.ts` — MSW 초기화 (현재 비활성화)
- `.env.local` — `NEXT_PUBLIC_MSW_ENV=true`, `NEXT_PUBLIC_API_URL=http://localhost:4000`

## 교훈 및 예방책

| 문제 | 예방책 |
|---|---|
| `useQuery`를 각 아이템 컴포넌트에서 호출 | 공통 데이터는 최상위에서 1회 fetch 후 prop drilling 또는 context 활용 |
| 버튼 조건 로직 반전 | `isXxx` naming convention 명확화, 조건 작성 시 주석 없어도 읽히게 |
| POST body 필드명 불일치 | 백엔드 DTO 타입을 프론트 공유 타입으로 정의하거나, API 계약 문서화 |
| 타입 미정의로 cascade 에러 | `index.tsx`에서 export하는 타입은 반드시 실제 정의가 있는지 확인 |
| MSW 비활성화 상태로 실 백엔드 호출 | MSW 활성화 조건 코드 리뷰 필수, `return;` 하드코딩 주의 |
