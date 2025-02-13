/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';

export default function page() {
  const text = `
    df-messenger {
          z-index: 999;
          position: fixed;
          --df-messenger-font-color: #000;
          --df-messenger-font-family: Google Sans;
          --df-messenger-chat-background: #f3f6fc;
          --df-messenger-message-user-background: #d3e3fd;
          --df-messenger-message-bot-background: #fff;
          bottom: 0;
          right: 0;
          top: 0;
          width: 100%;
        }
  `;
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />
      <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <df-messenger
              project-id="ridenow-f2d1d"
              agent-id="8d1c5375-4c6e-4757-919e-0e4529a0bfc7"
              language-code="en"
              max-query-length="-1"
            >
              <df-messenger-chat chat-title="Ride Now Support"></df-messenger-chat>
            </df-messenger>`,
        }}
      />
      <style>{text}</style>
    </div>
  );
}
