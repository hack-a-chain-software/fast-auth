import { Toaster } from 'react-hot-toast';
import { Fragment, useState } from "react";
import Content from "../components/Content";
import ExportContent from "../components/ExportContent";
import { WalletSelectorContextProvider } from "../contexts/WalletSelectorContext";
import { ExportAccountSelectorContextProvider } from "../contexts/WalletSelectorExportContext";

export const App = () => {
  const [showImport, setShowImport] = useState<boolean>(false);

  return (
    <Fragment>
        <div className="title-container">
          <h1>{showImport ? "Export Account" : "NEAR Guest Book"}</h1>
          <button onClick={() => setShowImport(!showImport)}>
            {showImport ? "Back to Log in" : "Try Export Account"}
          </button>
        </div>
        {showImport ? (
          <ExportAccountSelectorContextProvider>
            <ExportContent />
          </ExportAccountSelectorContextProvider>
        ) : (
          <WalletSelectorContextProvider>
            <Content />
          </WalletSelectorContextProvider>
        )}

      <div
        className="relative z-[999999999999999999999]"
      >
        <Toaster />
      </div>
    </Fragment>
  );
};
