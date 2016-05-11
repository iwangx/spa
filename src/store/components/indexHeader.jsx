/**
 * Created by iwangx on 16/3/22.
 */
var TodoTextInput=require("./indexTodoTextInput");
var Header=React.createClass({
    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text)
        }
    },
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput newTodo
                               onSave={this.handleSave}
                               placeholder="What needs to be done?" />
            </header>
        )
    }
});

module.exports=Header;