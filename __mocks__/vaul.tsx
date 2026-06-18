import React, { createContext, useContext } from 'react';

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  onOpenChange: () => {},
});

const Root = ({
  open = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) => (
  <DrawerContext.Provider value={{ open, onOpenChange: onOpenChange ?? (() => {}) }}>
    {children}
  </DrawerContext.Provider>
);

const Portal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

const Overlay = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;

const Content = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open } = useContext(DrawerContext);
  if (!open) return null;
  return <div {...props}>{children}</div>;
};

const Close = ({
  children,
  asChild = false,
  ...props
}: {
  children?: React.ReactNode;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onOpenChange } = useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        onOpenChange(false);
      },
    });
  }

  return (
    <button onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  );
};

const Trigger = ({
  children,
  asChild = false,
  ...props
}: {
  children?: React.ReactNode;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { onOpenChange } = useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      onClick?: React.MouseEventHandler;
    }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        onOpenChange(true);
      },
    });
  }

  return (
    <button onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
};

const Title = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props}>{children}</h2>;

const Description = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...props}>{children}</p>
);

export const Drawer = {
  Root,
  Portal,
  Overlay,
  Content,
  Close,
  Trigger,
  Title,
  Description,
};
