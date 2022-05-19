<script lang="ts">
import Heading from "./Heading.svelte";

import Rainbow from "./Rainbow.svelte";
import Text from "./Text.svelte";


    export let src = ''
    export let name = ''
    export let caption = ''
    export let description = ''
</script>

<div class="graduate">
    <div class="image" style="background-image: url({src})"></div>
    <div class="card-content">
        <div class="text">
            <Heading size={3} className="blue-text" marginY={0.5}>{ name }</Heading>
            <div style:width="80%">
                <Text className="caption" marginY={0.5} opacity={0.8}>{ caption }</Text>
                <Text className="description" marginBottom={0} opacity={0.6}>{ description }</Text>
            </div>
        </div>
    </div>
    <Rainbow size="S" fixed="bottom" />
</div>

<style>
    .graduate {
        background: #F6F6F6;
        max-width: 100%;
    }

    .graduate .image {
        display: block;
        width: 100%;
        height: 340px;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .graduate .card-content {
        position: relative;
        background-color: #F6F6F6;
    }

    .graduate .card-content .text {
        padding: 1em;
        padding-bottom: 2em;
    }
</style>
