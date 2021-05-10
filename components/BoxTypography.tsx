import React from "react";
import { SectionTitleProps } from "@/types/local";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function BoxTypography(
  props: SectionTitleProps
): React.ReactElement {
  const { children, component, color, maxWidth, paragraph, ...rest } = props;
  return (
    <Box component="div" maxWidth={maxWidth} {...rest}>
      <Typography
        color={color}
        paragraph={paragraph}
        {...rest}
        style={{ fontWeight: "inherit" }}
      >
        {children}
      </Typography>
    </Box>
  );
}
