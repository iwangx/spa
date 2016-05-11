/**
 * Created by iwangx on 16/3/22.
 */
var TodoTextInput=require("./indexTodoTextInput");

var TodoItem=React.createClass({
    getInitialState:function(){
        return {
            editing: false
        }
    },

    handleDoubleClick:function() {
        this.setState({ editing: true })
    },

    handleSave:function(id, text) {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({ editing: false })
    },

    render:function() {
        var todo=this.props.todo;
        var completeTodo=this.props.completeTodo;
        var deleteTodo=this.props.deleteTodo;
        var element
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={function(text){this.handleSave(todo.id, text)}.bind(this)} />
            )
        } else {
            element = (
                <div className="view">
                    <input className="toggle"
                           type="checkbox"
                           checked={todo.completed}
                           onChange={function(){completeTodo(todo.id)}} />
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy"
                            onClick={function(){ deleteTodo(todo.id)}} />
                </div>
            )
        }

        return (
            <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
                {element}
            </li>
        )
    }

});

module.exports=TodoItem;

