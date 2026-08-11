declare module 'react-simple-maps' {
  import React from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: React.ReactNode;
  }
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: any[] }) => React.ReactNode;
  }
  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyStyleState {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
    transition?: string;
    filter?: string;
  }

  export interface GeographyProps {
    geography: any;
    style?: {
      default?: GeographyStyleState;
      hover?: GeographyStyleState;
      pressed?: GeographyStyleState;
    };
    onMouseEnter?: (e: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (e: React.MouseEvent<SVGPathElement>) => void;
    onClick?: (e: React.MouseEvent<SVGPathElement>) => void;
    className?: string;
  }
  export const Geography: React.FC<GeographyProps>;

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }
  export const Marker: React.FC<MarkerProps>;

  export interface LineProps {
    from: [number, number];
    to: [number, number];
    stroke?: string;
    strokeWidth?: number;
    children?: React.ReactNode;
  }
  export const Line: React.FC<LineProps>;

  export interface AnnotationProps {
    subject: [number, number];
    dx?: number;
    dy?: number;
    children?: React.ReactNode;
  }
  export const Annotation: React.FC<AnnotationProps>;
}
