import React from "react";
import { createPortal } from "react-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/master
import { AnimatePresence, motion } from "framer-motion";

function Modal({ data, setter, ModalParam, handler, styles }) {
  let style = "bg-white rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-[55vw]  z-50";

  if (styles) style = styles;
<<<<<<< HEAD

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ y: "100vh", opacity: 0.5 }}
        animate={{ y: "0", opacity: 1 }}
        end={{ y: "100vh", opacity: 0.5 }}
        className="fixed top-0 left-0 w-full h-full bg-sky-200 bg-opacity-50 z-10 flex justify-center items-center"
        onClick={() => setter(false)}
      >
        <div className={style}>
          <div className="p-3">
            <ModalParam data={data} setter={setter} handler={handler} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
=======
import QuestionModal from "./QuestionModal";
=======
>>>>>>> origin/master

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ y: "100vh", opacity: 0.5 }}
        animate={{ y: "0", opacity: 1 }}
        end={{ y: "100vh", opacity: 0.5 }}
        className="fixed top-0 left-0 w-full h-full bg-sky-200 bg-opacity-50 z-10 flex justify-center items-center"
        onClick={() => setter(false)}
      >
        <div className={style}>
          <div className="p-3">
            <ModalParam data={data} setter={setter} handler={handler} />
          </div>
        </div>
<<<<<<< HEAD
      </div>
    </div>,
>>>>>>> origin/main
=======
      </motion.div>
    </AnimatePresence>,
>>>>>>> origin/master
    document.getElementById("modal")
  );
}

export default Modal;
