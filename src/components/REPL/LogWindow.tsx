import { Box } from "@mui/system";
import { FC, useEffect, useRef } from "react";

interface LogWindowProps {
  logMessages: string[];
}

interface LogMessageProps {
  message: string;
}

const LogMessage: FC<LogMessageProps> = ({ message }) => {
  if (message.startsWith('e:')) {
    return <Box sx={{
      whiteSpace: 'pre-wrap',
      color: '#e98380',
      background: '#250201',
      padding: '0 3px',
    }}>{message.substring(2)}</Box>;
  } else {
    return <Box sx={{
      whiteSpace: 'pre',
      padding: '0 3px',
    }}>{message}</Box>;
  }
};

export const LogWindow: FC<LogWindowProps> = ({ logMessages }) => {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (box.current) {
      box.current.scrollTo({
        top: box.current.scrollHeight,
      });
    }
  }, [logMessages, box]);

  return <Box ref={box}
    sx={{
      height: '400px',
      width: '100%',
      overflowY: 'scroll',
      overflowX: 'none',
      padding: '3px 0',
      borderTop: '1px solid #545454',
      borderBottom: '1px solid #545454',
      borderLeft: '1px outset #545454',
      borderRight: '1px inset #545454',
    }}
  >
    {logMessages.map((message, index) => <LogMessage key={index} message={message} />)}
  </Box>;
};
