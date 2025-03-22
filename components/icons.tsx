import * as React from "react";

import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const QuoteIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 18.12 11.78"
    >
      <g id="quote" transform="translate(-2.5 -19.12)">
        <path
          id="Path_115"
          data-name="Path 115"
          d="M10.33,19.687v6.6l-2.438,4.11a1,1,0,0,1-.818.505H4.949a.32.32,0,0,1-.313-.505l2.422-4.11H3.066a.567.567,0,0,1-.566-.566V19.687a.567.567,0,0,1,.566-.566h6.7a.567.567,0,0,1,.566.566Z"
        />
        <path
          id="Path_116"
          data-name="Path 116"
          d="M64.28,19.687v6.6l-2.436,4.11a1,1,0,0,1-.82.505H58.9a.321.321,0,0,1-.315-.505l2.424-4.11H57.016a.567.567,0,0,1-.566-.566V19.687a.567.567,0,0,1,.566-.566h6.7a.567.567,0,0,1,.566.566Z"
          transform="translate(-43.66)"
        />
      </g>
    </svg>
  );
};

export const StatsIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 12.027 12.036"
    >
      <g id="layer1" transform="translate(-0.264 -290.91)">
        <path
          id="rect823"
          d="M6.272.26a.547.547,0,0,0-.541.557V3.549H5.186a.547.547,0,0,0-.549.549V8.467a.547.547,0,0,0,.549.549h.544v2.732a.547.547,0,1,0,1.094,0V9.016h.549a.547.547,0,0,0,.544-.549V4.1a.547.547,0,0,0-.544-.549H6.825V.818A.547.547,0,0,0,6.272.26Zm4.369,0a.547.547,0,0,0-.536.557V6.83h-.55a.547.547,0,0,0-.544.544v4.373a.547.547,0,0,0,.544.549h2.187a.547.547,0,0,0,.549-.549V7.374a.547.547,0,0,0-.549-.544H11.2V.818A.547.547,0,0,0,10.641.26ZM.813.269A.547.547,0,0,0,.264.818V5.187a.547.547,0,0,0,.549.549h.544v6.012a.547.547,0,1,0,1.094,0V5.735H3a.547.547,0,0,0,.544-.549V.818A.547.547,0,0,0,3,.269Z"
          transform="translate(0 290.65)"
        />
      </g>
    </svg>
  );
};

export const CheckIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export const UploadIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12.688"
      height="15.859"
      viewBox="0 0 12.688 15.859"
    >
      <g id="new-document" transform="translate(-4 -1)">
        <path
          id="Path_117"
          data-name="Path 117"
          d="M21.464,2.139A2.638,2.638,0,0,0,21,1.775V4.537a.529.529,0,0,0,.529.529h2.762a2.638,2.638,0,0,0-.364-.464Z"
          transform="translate(-8.013 -0.365)"
        />
        <path
          id="Path_118"
          data-name="Path 118"
          d="M13.516,5.758A1.591,1.591,0,0,1,11.93,4.172V1.032C11.813,1.021,11.7,1,11.581,1H6.643A2.643,2.643,0,0,0,4,3.643V14.216a2.643,2.643,0,0,0,2.643,2.643h7.4a2.643,2.643,0,0,0,2.643-2.643V6.107c0-.122-.021-.233-.032-.349ZM12.458,9.987H10.872v1.586a.529.529,0,0,1-1.057,0V9.987H8.229a.529.529,0,1,1,0-1.057H9.815V7.344a.529.529,0,1,1,1.057,0V8.93h1.586a.529.529,0,1,1,0,1.057Z"
          transform="translate(0 0)"
        />
      </g>
    </svg>
  );
};

export const ClearIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13.3"
      height="13.372"
      viewBox="0 0 13.3 13.372"
    >
      <g id="Icon" transform="translate(-20.916 -19.561)" opacity="0.9">
        <path
          id="_161"
          d="M21.676,23.567l.272-2.992a.3.3,0,0,1,.506-.181l.75.75a6.684,6.684,0,1,1-2.28,6.191.6.6,0,0,1,.585-.693h1.058a.6.6,0,0,1,.583.481,4.459,4.459,0,1,0,1.638-4.4l.71.71a.3.3,0,0,1-.184.506l-2.992.272a.591.591,0,0,1-.645-.645Z"
        />
      </g>
    </svg>
  );
};

export const CopyIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.998"
      height="15.998"
      viewBox="0 0 15.998 15.998"
    >
      <path
        id="copy"
        d="M15.236,2H7.961A2.765,2.765,0,0,0,5.2,4.761V5.2H4.761A2.765,2.765,0,0,0,2,7.961v7.275A2.765,2.765,0,0,0,4.761,18h7.275a2.756,2.756,0,0,0,2.725-2.4h.475A2.765,2.765,0,0,0,18,12.837V4.761A2.765,2.765,0,0,0,15.236,2ZM16.4,12.837A1.163,1.163,0,0,1,15.236,14H14.8V7.961A2.765,2.765,0,0,0,12.037,5.2H6.8V4.761A1.163,1.163,0,0,1,7.961,3.6h7.275A1.163,1.163,0,0,1,16.4,4.761Z"
        transform="translate(-2 -2)"
      />
    </svg>
  );
};

export const DownloadIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.934"
      height="15.929"
      viewBox="0 0 14.934 15.929"
    >
      <g id="download" transform="translate(-16)">
        <g id="Group_57" data-name="Group 57" transform="translate(19.484)">
          <g id="Group_56" data-name="Group 56">
            <path
              id="Path_453"
              data-name="Path 453"
              d="M135.918,7.261a.5.5,0,0,0-.453-.292h-1.991V.5a.5.5,0,0,0-.5-.5h-1.991a.5.5,0,0,0-.5.5V6.969H128.5a.5.5,0,0,0-.374.825l3.485,3.982a.5.5,0,0,0,.749,0l3.485-3.982A.5.5,0,0,0,135.918,7.261Z"
              transform="translate(-127.998)"
            />
          </g>
        </g>
        <g id="Group_59" data-name="Group 59" transform="translate(16 10.951)">
          <g id="Group_58" data-name="Group 58">
            <path
              id="Path_454"
              data-name="Path 454"
              d="M28.943,352v2.987H17.991V352H16v3.982a1,1,0,0,0,1,1H29.938a1,1,0,0,0,1-1V352Z"
              transform="translate(-16 -352)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const InfoIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  className,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      id="fi_5593552"
      height={size || height}
      width={size || width}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={`${className} pointer-events-none`}
    >
      <g>
        <path
          fill={fill}
          d="m43.21973 52.285c-1.08.42-4.5 1.42-6.06.53a1.53557 1.53557 0 0 1 -.76-1.21c-.49-3.12 1.84-10.33 3.1-14.2.42-1.29.72-2.23.84-2.8.91-4.21.46-7.43-1.34-9.57-2.16559-2.5747-6.00818-3.07562-9.16-2.61a35.6498 35.6498 0 0 0 -9.31 2.56.98919.98919 0 0 0 -.54.7l-.65 3.11a1.00537 1.00537 0 0 0 .33.96 1.03129 1.03129 0 0 0 1 .18c1.19-.44 4.91-1.43 6.24-.21.75.69.54 2.15.24005 3.24-.31 1.14-.68005 2.37-1.06 3.66-2.46 8.37-5.26 17.86-.82 20.82a12.44074 12.44074 0 0 0 7.3 2.55c2.6 0 5.81-.82 10.43-2.69a.99792.99792 0 0 0 .59-.63l.95-3.17a1.01321 1.01321 0 0 0 -.28-1.03.99379.99379 0 0 0 -1.04005-.19z"
        ></path>
        <path
          fill={fill}
          d="m37.43976 4.005a7.235 7.235 0 1 0 7.24 7.24 7.24241 7.24241 0 0 0 -7.24-7.24z"
        ></path>
      </g>
    </svg>
  );
};

export const DoneIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  className,
  fill = "currentColor",
  ...props
}) => {
  return (
    <svg
      version="1.1"
      id="fi_62025"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size || width}
      height={size || height}
      fill={fill}
      viewBox="0 0 469.184 469.185"
    >
      <g>
        <path
          d="M462.5,96.193l-21.726-21.726c-8.951-8.95-23.562-8.95-32.59,0L180.368,302.361l-119.34-119.34
		c-8.95-8.951-23.562-8.951-32.589,0L6.712,204.747c-8.95,8.951-8.95,23.562,0,32.589L163.997,394.62
		c4.514,4.514,10.327,6.809,16.218,6.809s11.781-2.295,16.219-6.809L462.27,128.783C471.45,119.68,471.45,105.145,462.5,96.193z"
        ></path>
      </g>
    </svg>
  );
};
