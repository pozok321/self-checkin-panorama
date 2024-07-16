<template>
    <div class="justify-content-between flex mb-3" name="cart">
        <div class="my-car mt-4">
            <img src="../assets/image/cart.svg" alt="cart">
            <span>My Cart</span>
        </div>
        <div class="event-date">
            <p>FLEI EXPO XXII</p>
            <span>18 - 20 November 202</span>
        </div>
    </div>
</template>

<script>
 export default {
        props: [
            'events_id',
            'route_name',
            'global_url',
            'poster_mobile',
            'event_title'
        ]
    };

</script>