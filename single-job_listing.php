<?php
// Job Post
$context = Timber::get_context();

$post = new Timber\Post();
$context['post'] = $post;

$args = array(
    'post_type'      => 'job_listing',
    'posts_per_page' => 6,
    'post__not_in'   => array($post->ID)
);
$context['listings'] = new Timber\PostQuery($args);
// $context['sumome'] = true;

$templates = array( pll_current_language() . '-' .'job.twig' );
Timber::render( $templates, $context );