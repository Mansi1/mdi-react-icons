import React, {CSSProperties, ReactElement} from 'react';
import {defined} from "@milkscout/react";

export interface StyleProps {
  children: ReactElement
  style: CSSProperties
}

export const Style = ({children, style}: StyleProps) => {
  return  React.cloneElement(children, {
    style: { ...defined<CSSProperties>(children?.props?.style, {}), ...style },
  });

};
