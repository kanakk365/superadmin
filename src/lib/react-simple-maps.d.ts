declare module "react-simple-maps" {
  export interface ComposableMapProps {
    projectionConfig?: { scale?: number; center?: [number, number] };
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string;
    children: (props: { geographies: unknown[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    key?: string;
    geography: unknown;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
  }

  export interface MarkerProps {
    key?: string;
    coordinates: [number, number];
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
}
