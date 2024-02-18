import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      /**
       * This code snippet defines an onNavigate function that takes an object with a pathname property as an argument.
       * It compares the current pathname with the next pathname, and if they are different, it updates the navigation history to the next pathname.
       *
       * @param {Object} nextPathname - the next pathname to navigate to
       * @return {void}
       */
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    /**
     *
     * This code snippet defines an onParentNavigate function that facilitates container -> subapp communication
     *
     */
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref}></div>;
};

export default AuthApp;
