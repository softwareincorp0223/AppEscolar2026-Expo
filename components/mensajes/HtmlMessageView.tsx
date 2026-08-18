import { useMemo, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

interface HtmlMessageViewProps {
  html?: string | null;
}

export default function HtmlMessageView({ html }: HtmlMessageViewProps) {
  const [height, setHeight] = useState(80);

  const source = useMemo(
    () => ({
      html: `
        <!doctype html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              body {
                margin: 0;
                padding: 0;
                color: #212529;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                font-size: 15px;
                line-height: 1.55;
              }
              p { margin: 0 0 10px; }
              img, video, iframe { max-width: 100%; height: auto; }
            </style>
          </head>
          <body>${html || "Sin contenido"}</body>
        </html>
      `,
    }),
    [html]
  );

  return (
    <View className="mt-0.5 overflow-hidden">
      <WebView
        originWhitelist={["*"]}
        source={source}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{ height, backgroundColor: "transparent" }}
        onMessage={(event) => {
          const nextHeight = Number(event.nativeEvent.data);

          if (Number.isFinite(nextHeight) && nextHeight > 0) {
            setHeight(Math.max(80, nextHeight));
          }
        }}
        injectedJavaScript={`
          const height = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          );
          window.ReactNativeWebView.postMessage(String(height));
          true;
        `}
      />
    </View>
  );
}
