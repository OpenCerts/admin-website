import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { brandOrange } from "../styles/variables";

const MIGRATION_GUIDE_URL =
  "https://docs.opencerts.io/docs/migrations/oa_to_trustvc";

const bannerStyle = css`
  width: 100%;
  padding: 5px 0px;
  background: ${brandOrange};
  text-align: center;
  font-weight: bold;
`;

const MigrationBanner = () => (
  <div css={css(bannerStyle)}>
    Please note that as of 1 October 2025, OpenAttestation (OA) has been
    deprecated. OpenCerts has since migrated to TrustVC, which uses the W3C
    Verifiable Credentials (VC) format.
    <br />
    Documents previously issued in OA format remain verifiable — no action is
    required for existing certificates. However, we recommend upgrading to the
    W3C VC format for all new issuances.
    <br />
    To migrate, please refer to our{" "}
    <a href={MIGRATION_GUIDE_URL} target="_blank" rel="noopener noreferrer">
      migration guide
    </a>
    .
  </div>
);

export default MigrationBanner;
