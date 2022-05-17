<script>
    import Block from './components/Block.svelte'

    let contents = []
</script>

<main>
    {#each contents as content, i}
        <Block content={content}/>
    {/each}
</main>

<style>
</style>