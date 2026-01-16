declare module "react-markdown" {
  import * as React from "react";
  
  const ReactMarkdown: React.ComponentType<any>;
  export default ReactMarkdown;

  export type ReactMarkdownProps = any;
  export type Components = Record<string, React.ComponentType<any>>;
}
