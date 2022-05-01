import Component from "../core/Component.js";

export default class ItemAppender extends Component {
  template() {
    return `
            <input type="text" class="appender" placeholder="아이템입력"/>
        `;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      key === "Enter" && addItem(target.value);
    });
  }
}
