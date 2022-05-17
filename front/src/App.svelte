<script>
    import Block from './components/Block.svelte'

    let contents = []
    let content = ''

    function saveContent() {
        if (!content) {
            return
        }

        contents = [...contents, content]
        content = ''
    }
</script>

<main>
    <form on:submit|preventDefault={saveContent}>
        <input type="text" bind:value={content}/>
        <input type="submit" value="Add"/>
    </form>
    {#each contents as content, i}
        <Block content={content}/>
    {/each}
</main>

<style>
</style>