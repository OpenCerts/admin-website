import PropTypes from "prop-types";
import { Global, css } from "@emotion/core";
import { faintBlue, brandBlue } from "../../../styles/variables";

const View = () => {
  return (
    <div className={"viewer-container default"}>
      <Global
        styles={css`
          .viewer-container {
            text-align: center !important;
            padding: 1.5rem;
            height: 100%;
            justify-content: center !important;
            flex-direction: column !important;
            display: flex !important;
            border-radius: 10px;

            &.default {
              background-color: ${faintBlue};
              border: 2px dashed ${brandBlue};
              box-shadow: 0 0 0px 10px ${faintBlue};
            }
            .loader {
              color: ${brandBlue};
              margin: 120px 0;
            }
          }
        `}
      />
      <div className="text-center loader">
        <i className="fas fa-spinner fa-pulse fa-3x" />
        <div className="m-3" style={{ fontSize: "1.5rem" }}>
          Verifying Certificate...
        </div>
      </div>
    </div>
  );
};

export default View;

View.propTypes = {
  verificationStatus: PropTypes.array
};
