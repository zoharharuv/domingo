import { motion } from "framer-motion";
export function Backdrop({ children, onClick }) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backdrop"
            onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
                onClick()
            }}
        >
            {children}
        </motion.div>
    )
}