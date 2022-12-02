import PSPDFKitType, { Instance } from "pspdfkit";
import {
  MutableRefObject,
  useEffect, useState
} from "react";
const usePSPDFKit = (props: {
  containerRef: MutableRefObject<HTMLDivElement | null>
  document: string
}): {
  PSPDFKit: typeof PSPDFKitType,
  instance: Instance
} | {} => {
  const { containerRef, document } = props;
  const [PSPDFKit, setPSPDFKit] = useState<typeof PSPDFKitType | null>(null);
  const [instance, setInstance] = useState<Instance | null>(null);
  useEffect(() => {
    (async () => {
      setPSPDFKit((await import("pspdfkit") as unknown) as typeof PSPDFKitType);
    })();
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !document || !PSPDFKit) {
      return () => {};
    }
    (async () => {
      try {
        setInstance(await PSPDFKit.load({
          container,
          document,
          baseUrl: `${window.location.protocol}//${window.location.host}/`
        }));
      } catch (e) {
        // carry on
      }
    })();
    return () => {
      PSPDFKit.unload(container);
    };
  }, [containerRef, document, PSPDFKit]);
  if (!PSPDFKit || !instance) {
    return {};
  }
  return {
    PSPDFKit,
    instance
  };
};
export default usePSPDFKit;
