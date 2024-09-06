import React from 'react';
import { OverlayTrigger, Tooltip, type TooltipProps } from 'react-bootstrap';
import type { JSX } from 'react/jsx-runtime';

const getBaseUrl = (): string => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
};
const HoverImage = ({pathImages}: { pathImages: string }) => {
  const baseUrl = getBaseUrl();
  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="image-tooltip" {...props}>
      <img src={pathImages} alt="Hover" />
    </Tooltip>
  );

  return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        
        <img src={`${baseUrl}/GiftFromGod/search.png`} alt="search" width={25} height={25} />
      </OverlayTrigger>
  );
};

export default HoverImage;