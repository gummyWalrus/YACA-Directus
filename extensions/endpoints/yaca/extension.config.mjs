import builtins from 'rollup-plugin-node-builtins';
import resolve from '@rollup/plugin-node-resolve';
import nodeGlobals from 'rollup-plugin-node-globals';

const _default = {
    plugins: [
        builtins({
            fs: false
        }),
        resolve({
            preferBuiltins: true,
        }),
    ],
    external: ["fsevents"],
};
export { _default as default };