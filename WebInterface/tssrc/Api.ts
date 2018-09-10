class Api<T = any> {
    private constructor(private buildAddr: string) { }

    public static call<T>(...params: (string | Api)[]): Api<T> {
        let buildStr = "";
        for (const param of params) {
            if (typeof param === "string") {
                buildStr += "/" + encodeURIComponent(param);
            } else {
                buildStr += "/(" + param.done() + ")";
            }
        }
        return new Api<T>(buildStr);
    }

    public done(): string {
        return this.buildAddr;
    }
}

function cmd<T = any>(...params: (string | Api)[]): Api<T> {
    return Api.call(...params);
}

function bot<T = any>(param: Api<T>, id: number = Main.state["bot_id"]): Api<T> {
    return Api.call("bot", "use", id.toString(), param);
}