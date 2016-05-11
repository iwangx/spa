/**
 * Created by iwangx on 16/3/22.
 */


var TodoItem=require("./indexTodoItem");
var Footer=require("./indexFooter");

var filters=require("../constants/indexFilters");
var TODO_FILTERS={
    SHOW_ALL:(function () {
        return true;
    }),
    SHOW_ACTIVE:(function(todo){return !todo.completed}),
    SHOW_COMPLETED:(function(todo){return todo.completed})
};

var MainSection=React.createClass({
    getInitialState:function(){
        return {
            filter: filters.SHOW_ALL
        }
    },

    handleClearCompleted:function() {
        var atLeastOneCompleted = this.props.todos.some(function(todo){
           return todo.completed
        });
        if (atLeastOneCompleted) {
            this.props.actions.clearCompleted()
        }
    },

    handleShow:function(filter) {
        this.setState({ filter })
    },
    renderToggleAll(completedCount) {
        var todos=this.props.todos;
        var actions=this.props.actions;
        if (todos.length > 0) {
            return (
                <input className="toggle-all"
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll} />
            )
        }
    },

    renderFooter:function(completedCount) {
        var todos=this.props.todos;
        var filter=this.state.filter;
        var  activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer completedCount={completedCount}
                        activeCount={activeCount}
                        filter={filter}
                        onClearCompleted={this.handleClearCompleted}
                        onShow={this.handleShow} />
            )
        }
    },

    render:function() {
        var todos=this.props.todos;
        var actions=this.props.actions;
        var filter=this.state.filter;
        var filteredTodos = todos.filter(TODO_FILTERS[filter]);
        var completedCount=todos.reduce(function(count, todo){
           return todo.completed ? count + 1 : count;
        },0);

        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}
                <ul className="todo-list">
                    {filteredTodos.map(function(todo){
                       return <TodoItem key={todo.id} todo={todo}  {...actions} />
                    }.bind(this))}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        )
    }

});

module.exports=MainSection;

