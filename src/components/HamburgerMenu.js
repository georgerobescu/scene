import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, clearAuth } from '../lib/auth';

const HamburgerMenu = props => {
  const { nativeNotifs, visible } = props;
  const navigate = useNavigate();
  const auth = getAuth();

  return (
    <div
      id="hamburger"
      className={`${visible.value ? 'shown' : ''}`}>
      <section className="flex flex-col gap-2">
        <NotificationsToggle value={nativeNotifs.value} set={nativeNotifs.set} />
        <BackgroundInput onSave={() => visible.set(false)} />
        <LogOut
          ship={auth?.ship}
          handleLogout={() => {
            clearAuth();
          }}
        />
      </section>
    </div>
  );
};

function isValidUrl(input) {
  try {
    new URL(input);
  } catch (err) {
    return false;
  }
  return true;
}

function isImage(input) {
  return /\.(jpe?g|tiff?|png|webp|bmp)$/i.test(input);
}

const BackgroundInput = props => {
  const { onSave } = props;
  const previousBg = window.localStorage.getItem('tirrel-desktop-background') || '';
  const [value, setValue] = useState(previousBg);
  const validity = isValidUrl(value) && isImage(value);


  const handleSave = () => {
    window.localStorage.setItem('tirrel-desktop-background', value);
    onSave();
  };

  return (
    <div className="rounded bg-neutral-500 text-white overflow-hidden">
      <header className="bg-neutral-600 text-xs px-2 py-1">
        Background Image
      </header>
      <div className="flex flex-col gap-1 p-2">
        <div className="flex gap-1">
          <input
            type="url"
            id="background-input"
            className={`block grow rounded p-1 text-small text-black border-2 ${!!value && !validity ? 'border-red-400' : 'border-transparent'
              }`}
            placeholder="https://image.host/image.jpg"
            onChange={ev => setValue(ev.target.value)}
            value={value}
          />
          <button disabled={!validity} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
};

const NotificationsToggle = props => {
  const { value, set } = props;
  const toggle = () => set(!value);
  return (
    <div className="rounded bg-neutral-500 text-white overflow-hidden">
      <header className="bg-neutral-600 text-xs px-2 py-1">
        Native Notifications
      </header>
      <div className="flex flex-col gap-1 p-2">
        <div className="flex gap-1 items-center">
          <div className="grow">
            <p>
              Native notifications are&nbsp;
              <span className="underline">
               {value ? 'enabled' : 'disabled'}
              </span>
            </p>
          </div>
          <button onClick={toggle}>
            {!value ? 'Enable' : 'Disable'}
          </button>
        </div>
      </div>
    </div>
  )
};

const LogOut = props => {
  return (
    <div className="rounded bg-neutral-500 text-white overflow-hidden">
      <header className="bg-neutral-600 text-xs px-2 py-1">
        Log Out
      </header>
      <div className="flex flex-col gap-1 p-2">
        <div className="flex gap-1 items-center">
          <div className="grow">
            <p>
              Log out of <code>~{props.ship}</code>
            </p>
          </div>
          <button onClick={props.handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
