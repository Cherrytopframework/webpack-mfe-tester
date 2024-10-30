import React, { useEffect, useRef, useState } from 'react';
// import './style.css';
// @ts-ignore
import { WebContainer } from '@webcontainer/api';
import { files } from '../../../utilities/files/files';

const WebContainerComponent: React.FC = () => {
    const [textareaValue, setTextareaValue] = useState(files['index.js'].file.contents);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [webcontainerInstance, setWebcontainerInstance] = useState<WebContainer | null>(null);

    useEffect(() => {
        // Initialize the WebContainer and start the development server
        const initWebContainer = async () => {
            // Boot WebContainer
            const instance = await WebContainer.boot();
            setWebcontainerInstance(instance);
            await instance.mount(files);

            // Install dependencies
            const exitCode = await installDependencies(instance);
            if (exitCode !== 0) {
                throw new Error('Installation failed');
            }

            // Start dev server
            startDevServer(instance);
        };

        initWebContainer();
    }, []);

    useEffect(() => {
        if (webcontainerInstance) {
            // Handle input changes and write the updated content to `/index.js`
            writeIndexJS(textareaValue);
        }
    }, [textareaValue, webcontainerInstance]);

    // Install dependencies
    const installDependencies = async (instance: WebContainer) => {
        const installProcess = await instance.spawn('npm', ['install']);
        installProcess.output.pipeTo(
            new WritableStream({
                write(data) {
                    console.log(data);
                },
            })
        );
        return installProcess.exit;
    };

    // Start the development server and set iframe source
    const startDevServer = async (instance: WebContainer) => {
        await instance.spawn('npm', ['run', 'start']);

        // Listen for the server-ready event
        instance.on('server-ready', (port: number, url: string) => {
            console.log(`Server ready at ${url} on port ${port}`);
            if (iframeRef.current) {
                iframeRef.current.src = url;
            }
        });
    };

    // Write to `/index.js` file in the WebContainer
    const writeIndexJS = async (content: string) => {
        if (webcontainerInstance) {
            await webcontainerInstance.fs.writeFile('/index.js', content);
        }
    };

    return (
        <div className="container">
            <div className="editor">
                <textarea
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    placeholder="I am a textarea"
                />
            </div>
            <div className="preview">
                <iframe ref={iframeRef} title="Preview" src="loading.html" />
            </div>
        </div>
    );
};

export default WebContainerComponent;
