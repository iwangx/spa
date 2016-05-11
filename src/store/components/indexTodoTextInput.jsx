/**
 * Created by iwangx on 16/3/22.
 */

var TodoTextInput=React.createClass({

    getInitialState:function(){
        return {
            text: this.props.text || ''
        }
    },

    handleSubmit:function(e){
        var text = e.target.value.trim()
        if (e.which === 13) {
            this.props.onSave(text)
            if (this.props.newTodo) {
                this.setState({ text: '' })
            }
        }
    },

    handleChange:function(e) {
        this.setState({ text: e.target.value })
    },

    handleBlur:function(e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value)
        }
    },

    render() {
        return (
            <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
                   type="text"
                   placeholder={this.props.placeholder}
                   autoFocus="true"
                   value={this.state.text}
                   onBlur={this.handleBlur}
                   onChange={this.handleChange}
                   onKeyDown={this.handleSubmit} />
        )
    }

});

module.exports=TodoTextInput;
