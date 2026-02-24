import React, { ElementRef, forwardRef } from "react";
import { Input, type InputProps } from "tamagui";

type AppTextInputElement = ElementRef<typeof Input>;

interface AppTextInputProps extends InputProps {
  hasError?: boolean;
}

export const AppTextInput = forwardRef<AppTextInputElement, AppTextInputProps>(
  ({ hasError = false, style, ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        py={8}
        px={12}
        borderWidth={1}
        fontSize={16}
        borderColor={hasError ? "#c00" : "#666"}
        focusStyle={{
          borderColor: "#666",
          outlineWidth: 0,
        }}
        style={[
          { borderRadius: 6, backgroundColor: "transparent" },
          style,
        ]}
        {...rest}
      />
    );
  },
);

AppTextInput.displayName = "AppTextInput";
