/**
 * Created by iwangx on 16/3/22.
 */
var filters=require("../constants/indexTypes");

var FILTER_TITLES={
    SHOW_ALL:"all",
    SHOW_ACTIVE:"active",
    SHOW_COMPLETED:"Completed"
};

var Footer=React.createClass({
    renderTodoCount:function(){
        var activeCount = this.props.activeCount;
        var itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        )
    },

    renderFilterLink:function(filter) {
        var title = FILTER_TITLES[filter];
        var selectedFilter=this.props.selectedFilter;
        var onShow=this.props.onShow;
        return (
            <a className={classnames({ selected: filter === selectedFilter })}
               style={{ cursor: 'pointer' }}
               onClick={function(){onShow(filter)}}>
                {title}
            </a>
        )
    },

    renderClearButton:function() {
        var completedCount=this.props.completedCount;
        var onClearCompleted=this.props.onClearCompleted;

        if (completedCount > 0) {
            return (
                <button className="clear-completed"
                        onClick={onClearCompleted} >
                    Clear completed
                </button>
            )
        }
    },
    render:function() {
        return (
            <footer className="footer">
                {this.renderTodoCount()}
                <ul className="filters">
                    {[ filters.SHOW_ALL, filters.SHOW_ACTIVE, filters.SHOW_COMPLETED ].map(filter =>
                        <li key={filter}>
                            {this.renderFilterLink(filter)}
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </footer>
        )
    }
});

module.exports=Footer;

