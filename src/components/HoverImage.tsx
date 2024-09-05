import React from 'react';
import { OverlayTrigger, Tooltip, type TooltipProps } from 'react-bootstrap';
import type { JSX } from 'react/jsx-runtime';

const HoverImage = () => {

  const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="image-tooltip" {...props}>
      <img src="GiftFromGod/notes/การประกาศ.png" alt="Hover" />
    </Tooltip>
  );

  return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <img src="GiftFromGod/search.png" alt="search" width={25} height={25}/>
      </OverlayTrigger>
  );
};

export default HoverImage;