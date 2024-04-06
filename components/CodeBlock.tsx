

import React from 'react';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="relative group">
      <pre>
        <code>{code}</code>
      </pre>
      <p text={code} onCopy={handleCopy}>
        <button className="absolute right-0 top-0 p-2">
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </p>
      {copied && <span className="text-sm">Copied!</span>}
    </div>
  );
};

export default CodeBlock;