import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = {
      // count: this.$state || 0,
      count: 0,
    };
  }

  template() {
    const { filteredItems } = this.$props;
    const { count } = this.$state;
    console.log("rerender", count);
    return `
        <div>토글을 누른 횟수: ${count}</div>
        <ul>
        ${filteredItems
          .map(
            ({ contents, active, seq }) => `
            <li data-seq="${seq}">
                ${contents}
                <button class="toggleBtn" style="color: ${
                  active ? "red" : "grey"
                }">
                ${active ? "active" : "inactive"}
                </button>
                <button class="deleteBtn">delete btn</button>
            </li>
        `
          )
          .join("")}
        </ul>
        `;
  }

  setEvent() {
    const { toggleItem, deleteItem } = this.$props;
    this.addEvent("click", ".toggleBtn", ({ target }) => {
      this.setState({ count: this.$state.count + 1 });
      toggleItem(Number(target.closest("[data-seq]").dataset.seq));
    });
    this.addEvent("click", ".deleteBtn", ({ target }) => {
      deleteItem(Number(target.closest("[data-seq]").dataset.seq));
    });
  }
}
