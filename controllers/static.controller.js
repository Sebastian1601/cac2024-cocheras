//rutear los recursos estáticas

export default class staticRouter {

    static returnIndex = (req, res) => {
        res.status(200).end('index.html');
    };
};