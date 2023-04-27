import { useContext, useEffect, useRef } from "react";

import { ConfigurationSettingsContext } from "src/Context/Contexts";

import "@esri/calcite-components/dist/components/calcite-modal";
import "@esri/calcite-components/dist/components/calcite-button";
import { CalciteModal, CalciteButton } from "@esri/calcite-components-react/dist/components";

import { IConfigurationSettingsContext } from "src/types/interfaces";
import { getCSSClass } from "src/utils/cssUtils";

const name = "splash";

const CSS = {
  BASE: getCSSClass({ name }),
  headerText: getCSSClass({ name, desc: "header-text" })
};

const Splash = () => {
  const modalRef = useRef(null);
  const { splashTitle, splashContent, splashButtonText, infoIsOpen, updateInfoIsOpen } = useContext(
    ConfigurationSettingsContext
  ) as IConfigurationSettingsContext;

  useEffect(() => {
    const node = modalRef?.current as any;
    if (node) node.open = infoIsOpen as boolean;
  }, [modalRef, infoIsOpen]);

  const renderHeader = () => {
    return (
      <header slot="header">
        <h2 className={CSS.headerText}>{splashTitle}</h2>
      </header>
    );
  };

  const renderContent = () => {
    const __html = splashContent as string;
    return <div slot="content" dangerouslySetInnerHTML={{ __html }} />;
  };

  const renderPrimaryButton = () => {
    return (
      <CalciteButton slot="primary" onClick={() => updateInfoIsOpen(false)}>
        {splashButtonText}
      </CalciteButton>
    );
  };

  return (
    <CalciteModal
      ref={modalRef}
      className={CSS.BASE}
      onCalciteModalClose={() => updateInfoIsOpen(false)}
    >
      {renderHeader()}
      {renderContent()}
      {renderPrimaryButton()}
    </CalciteModal>
  );
};

export default Splash;
