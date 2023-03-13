// Error handler; DO NOT MOVE/RENAME THIS FILE
import { Handler } from 'suivle'

export const handle = async ($: Handler, err: [number, string] | number) => {
    console.log('httpStatus:', err[0] ?? err)

    const errMsg = err[1] ?? `<code>${$.path}</code> doesn't exist.`
    return errMsg
}
