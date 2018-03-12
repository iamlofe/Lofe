
export default function(err, req, res, next) {
    let {status = 500, message = "Error server" } = err;

    return res
        .status(status)
        .json({message})
}