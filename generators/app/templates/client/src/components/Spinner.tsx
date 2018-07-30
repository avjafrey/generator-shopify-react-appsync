import { Spinner as PolarisSpinner } from "@shopify/polaris";
import * as React from "react";

import * as styles from "./Spinner.scss";

export function Spinner() {
    return (
        <div className={styles.spinner}><PolarisSpinner size="large"/></div>
    );
}
