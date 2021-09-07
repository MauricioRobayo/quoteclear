import * as React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const QuoteLoader: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    backgroundColor="#f9f9f9"
    foregroundColor="#f4f4f4"
    viewBox="0 0 400 110"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="360" height="10" />
    <rect x="0" y="20" rx="3" ry="3" width="340" height="10" />
    <rect x="0" y="40" rx="3" ry="3" width="360" height="10" />
    <rect x="0" y="60" rx="3" ry="3" width="180" height="10" />
    <rect x="240" y="100" rx="3" ry="3" width="260" height="10" />
  </ContentLoader>
);
