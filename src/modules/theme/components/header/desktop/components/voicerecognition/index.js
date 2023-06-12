/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
/* eslint-disable linebreak-style */
import MicIcon from '@material-ui/icons/Mic';
import IconButton from '@material-ui/core/IconButton';

/**
 *
 * VoiceRecognition using library react-speech-recognition
 *
 * https://www.npmjs.com/package/react-speech-recognition
 *
 * @param {*} props
 * @returns
 */
const VoiceRecognition = (props) => {
    const { enableVoice, clickHandler } = props;

    if (!enableVoice) {
        return <></>;
    }

    return (
        <div className="mic-icon">

            <IconButton edge="end" aria-label="close" onClick={clickHandler}>
                <MicIcon style={{ fill: '#f58732' }} />
            </IconButton>

            <style jsx>
                {`
                    @media (max-width: 767px) {
                        .mic-icon {
                            top: -3px;
                        }
                    }
                    @media (min-width: 768px) {
                        .mic-icon {
                            left: 0;
                        }
                    }
                    .mic-icon {
                        position: absolute;
                        z-index: 9;
                    }
            `}
            </style>
        </div>
    );
};

export default VoiceRecognition;
