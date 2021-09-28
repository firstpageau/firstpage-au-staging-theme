<?php
// Blog Post
$context = Timber::get_context();

$context['post'] = new Timber\Post();
$current_post_categories = wp_get_post_categories( get_the_ID() );

$args = array(
    'category__in' => $current_post_categories,
	'post__not_in' => array( get_the_ID() ),
    'posts_per_page'  => 5,
);
$context['recent'] = new Timber\PostQuery($args);
// $context['sumome'] = true;
// $context['floatform'] = true;

$templates = array( pll_current_language() . '-' .'blog-post.twig' );
Timber::render( $templates, $context );