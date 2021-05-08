// TypeScript Complete
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { LinkProps, NextLinkComposedProps } from "@/types/local";
import clsx from "clsx";
import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    href,
    replace,
    scroll,
    passHref,
    shallow,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    role,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a
          className={className}
          href={href as string}
          ref={ref as any}
          {...other}
        />
      );
    }

    return (
      <MuiLink
        className={className}
        href={href as string}
        ref={ref}
        {...other}
      />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref as any}
        to={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      {...other}
    />
  );
});

export default Link;
