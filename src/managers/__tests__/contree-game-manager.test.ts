import { ContreeGameManager } from "../ContreeGameManager";

test("it returns non null after init", () => {
	const manager = new ContreeGameManager();
	const res = manager.init();
	expect(res).not.toBeNull();
});
