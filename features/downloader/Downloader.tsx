import * as React from 'react';
import { IAnchorProps } from './IAnchorProps';
import { IDownloadContext } from './IDownloadContext';
import styles from './DownloaderAnchor.module.css';

export class Downloader {
  private static BLOB_URL_EXPIRATION_TIME = 30 * 1000;

  private static DownloaderContext = React.createContext<IDownloadContext>({
    download: () => {
      throw new Error('DownloaderContext provider is missing!');
    },
  });

  private static DownloaderAnchor(props: IAnchorProps) {
    return <a ref={props.onAnchorRendered} className={styles.anchor} />;
  }

  public static useDownload() {
    return React.useContext(Downloader.DownloaderContext);
  }

  public static DownloadProvider(props: React.PropsWithChildren<object>) {
    const anchorRef = React.useRef<HTMLAnchorElement>();
    const setRef = React.useCallback((ref: HTMLAnchorElement) => {
      anchorRef.current = ref;
    }, []);

    const download = React.useCallback((fileName: string, data: string) => {
      if (!anchorRef.current) {
        return;
      }
      const downloader = new Downloader(fileName, data, anchorRef.current);
      downloader.download();
      setTimeout(() => {
        downloader.dispose();
      }, Downloader.BLOB_URL_EXPIRATION_TIME);
    }, []);

    const downloadActions = React.useMemo(() => {
      return { download };
    }, [download]);

    return (
      <React.Fragment>
        <Downloader.DownloaderAnchor onAnchorRendered={setRef} />
        <Downloader.DownloaderContext.Provider value={downloadActions}>
          {props.children}
        </Downloader.DownloaderContext.Provider>
      </React.Fragment>
    );
  }

  private readonly mimeOptions = { type: 'text/plain;charset=utf-8' };

  private readonly blobURL: string;

  private disposed = false;

  public constructor(
    private readonly fileName: string,
    private readonly text: string,
    private readonly anchor: HTMLAnchorElement
  ) {
    this.blobURL = URL.createObjectURL(new Blob([this.text], this.mimeOptions));
  }

  public download() {
    if (this.disposed) {
      throw new Error('This downloader instanse has been already disposed');
    }
    const href = this.anchor.href;
    const download = this.anchor.download;
    this.anchor.href = this.blobURL;
    this.anchor.download = this.fileName;
    this.anchor.click();
    this.anchor.href = href;
    this.anchor.download = download;
  }

  public isDisposed() {
    return this.isDisposed;
  }

  public dispose() {
    this.disposed = true;
    URL.revokeObjectURL(this.blobURL);
  }
}
