/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import Divider from "../../UI/Divider";
import { OrangeOutlineButton } from "../../UI/Button";
import {
  brandBlue,
  faintBlue,
  faintGreen,
  invalidBackground,
  invalidColor,
  white
} from "../../../styles/variables";

const invalidStyle = css`
  background-color: ${invalidBackground};
  border: 2px dashed ${invalidColor};
  box-shadow: 0 0 0px 10px ${invalidBackground};
  color: ${invalidColor};

  & .unverified-btn {
    @include btn(${invalidColor}, lighten(${invalidColor}, 5%), ${white});
  }
`;

const draggingStyle = css`
  background-color: ${faintGreen};
  border: 2px dashed ${brandBlue};
  box-shadow: 0 0 0px 10px ${faintGreen};
`;

const style = css`
  text-align: center !important;
  padding: 1.5rem;
  height: 100%;
  justify-content: center !important;
  flex-direction: column !important;
  display: flex !important;
  border-radius: 10px;
  background-color: ${faintBlue};
  border: 2px dashed ${brandBlue};
  box-shadow: 0 0 0px 10px ${faintBlue};

  &.invalid {
    background-color: ${invalidBackground};
    border: 2px dashed ${invalidColor};
    box-shadow: 0 0 0px 10px ${invalidBackground};
    color: ${invalidColor};

    .unverified-btn {
      @include btn(${invalidColor}, lighten(${invalidColor}, 5%), ${white});
    }
  }

  .unverified-btn {
    margin: auto;
  }

  .image-container {
    margin-bottom: 1rem;
    img {
      height: 110px;
    }
  }

  .message {
    font-size: 1.375rem;
    font-weight: 500;
  }

  .btn {
    @include btn(${brandBlue});
    background-color: ${white};
    margin: 0 auto;
  }

  .text-link {
    color: #787878 !important;
    text-decoration: underline !important;
    &:hover {
      color: #324353 !important;
    }
  }
`;

export const DefaultView = ({ invalid, className }) => (
  <div className={className} css={style}>
    <div className="image-container">
      <i>
        <img
          alt=".opencert Dropzone"
          src="/static/images/dropzone/dropzone_illustration.svg"
        />
      </i>
    </div>
    {invalid ? (
      <div>
        File cannot be read. Please check that you have a valid .opencert file
      </div>
    ) : null}
    <div className="message">Drag and drop your opencert file</div>
    <Divider text="or" />
    <div className="text-muted row">
      <div className="mx-auto">
        <OrangeOutlineButton variant="pill">Select File</OrangeOutlineButton>
      </div>
    </div>
  </div>
);
export const InvalidFileView = () => <DefaultView css={invalidStyle} invalid />;
export const DraggingView = () => <DefaultView css={draggingStyle} />;

DefaultView.propTypes = {
  className: PropTypes.any,
  invalid: PropTypes.bool
};
