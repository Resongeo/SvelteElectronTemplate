<div id="topbar">
    <div class="drag-area dragable"></div>
    <ul>
        <li>
            <div on:click={() => AppControl('minimize')}>
                <img src="icons/minimize.png">
            </div>
        </li>
        <li>
            <div on:click={() => AppControl('maximize')}>
                <img src="icons/maximize.png">
            </div>
        </li>
        <li>
            <div on:click={() => AppControl('close')}>
                <img src="icons/close.png">
            </div>
        </li>
    </ul>
</div>

<script>
    const electron = require("electron")
    const { ipcRenderer } = electron

    function AppControl(type){
        ipcRenderer.send("app:controls", type)
    }
</script>

<style>
    #topbar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
	    background-color: #1d1c1c;

        display: flex;
        align-items: center;
        justify-content: center;

        z-index: 1000;
    }
    
    ul{
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        list-style: none;
    }

    ul li div{
        width: 20px;
        height: 20px;
        margin: 0 15px 0 10px;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }

    ul li div img{
        width: 100%;
        height: 100%;
    }
    
    .drag-area{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>