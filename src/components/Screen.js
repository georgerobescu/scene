import { Rnd } from 'react-rnd';
import { useState } from 'react';

export default function Screen({ windows, selectedWindow, hiddenWindow }) {
    return <div className="grow">
        {windows.value.map((win, index) => <Window
            win={win}
            index={index}
            windows={windows}
            selectedWindow={selectedWindow}
            hiddenWindow={hiddenWindow}
        />)
        }
    </div>
}

const Window = ({ win, index, windows, selectedWindow, hiddenWindow }) => {
    const [key, setKey] = useState(0);
    const href = 'glob' in win.chad ? `${process.env.REACT_APP_URL}/apps/${win.href.glob.base}` : `${process.env.REACT_APP_URL}${win.href.site}`;
    return <Rnd
        key={win.title}
        className="rounded-xl overflow-hidden"
        style={{
            zIndex: ([...selectedWindow.value].reverse().indexOf(win) + 1) * 10,
            visibility: hiddenWindow.value.includes(win) ? "hidden" : "visible"
        }}
        default={{
            x: (index + 1) * 100,
            y: (index + 1) * 100,
            width: 640,
            height: 480,
        }}
        onMouseDown={() => selectedWindow.set([win, ...selectedWindow.value.filter((e) => e !== win)])}
    >
        <div className="w-full h-full p-2 flex flex-col bg-black cursor-default">
            <div className="h-8 bg-black text-white w-full flex justify-between px-1">
                <p>{win.title}</p>
                <div className="flex space-x-2 items-center">
                    <a
                        className="text-white"
                        onClick={() => setKey(key + 1)}
                    >
                        refresh
                    </a>
                    <a
                        className="text-white"
                        onClick={() => hiddenWindow.set([...hiddenWindow.value, win])}>
                        _
                    </a>
                    <a
                        className="text-white"
                        onClick={() => windows.set(windows.value.filter((e) => e !== win))}
                    >
                        x
                    </a>
                </div>
            </div>
            <Frame href={href} title={win.title} key={key} />
        </div>
    </Rnd>
}

const Frame = ({ href, title, key }) => {
    return <iframe className="w-full h-full bg-white min-h-0" src={href} title={title} key={key} />
}