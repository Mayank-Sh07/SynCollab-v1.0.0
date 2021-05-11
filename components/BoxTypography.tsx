import React from "react";
import { SectionTitleProps } from "@/types/local";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function BoxTypography(
  props: SectionTitleProps
): React.ReactElement {
  const {
    children,
    component,
    color,
    maxWidth,
    paragraph,
    className,
    fontSize,
    lineHeight,
    ...rest
  } = props;
  return (
    <Box component="div" maxWidth={maxWidth} lineHeight={lineHeight} {...rest}>
      <Typography
        color={color}
        paragraph={paragraph}
        className={className}
        {...rest}
        style={{
          lineHeight: "inherit",
          fontWeight: "inherit",
          fontSize: !!fontSize ? fontSize : undefined,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
